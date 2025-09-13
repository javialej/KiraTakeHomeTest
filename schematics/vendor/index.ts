import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  mergeWith,
  chain,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as ts from 'typescript';

// Helper function to add an import to a TypeScript file
function addImportToModule(tree: Tree, modulePath: string, symbolName: string, fileName: string): void {
  const sourceText = tree.read(modulePath)!.toString('utf-8');
  const sourceFile = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

  const importStatement = `import { ${symbolName} } from '${fileName}';\n`;
  const recorder = tree.beginUpdate(modulePath);
  recorder.insertRight(0, importStatement);
  tree.commitUpdate(recorder);
}

// Helper function to add a provider to a NestJS module
function addProviderToModule(tree: Tree, modulePath: string, providerName: string): void {
  let sourceText = tree.read(modulePath)!.toString('utf-8');
  let sourceFile = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

  const findProvidersArray = (node: ts.Node): ts.ArrayLiteralExpression | undefined => {
    if (ts.isPropertyAssignment(node) && node.name.getText(sourceFile) === 'providers') {
      if (ts.isArrayLiteralExpression(node.initializer)) {
        return node.initializer;
      }
    }
    return node.forEachChild(findProvidersArray);
  };

  const providersArray = findProvidersArray(sourceFile);

  if (providersArray) {
    const recorder = tree.beginUpdate(modulePath);
    const newProvider = `  ${providerName},\n`;
    // Insert the new provider at the end of the array
    recorder.insertLeft(providersArray.elements.end, newProvider);
    tree.commitUpdate(recorder);
  }
}


export function vendor(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { name } = _options;
    const lowerVendorName = strings.dasherize(name).toLowerCase();
    const pascalVendorName = `Blockchain${strings.classify(name)}`;
    const modulePath = 'src/adapter/out/blockchainVendors';
    const vendorPath = `${modulePath}/${lowerVendorName}`;
    const paymentsModulePath = 'src/payments.module.ts';

    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        name: lowerVendorName,
        pascalName: pascalVendorName,
      }),
    ]);

    const merged = mergeWith(templateSource);

    const rule = chain([
      merged,
      (tree: Tree, _context: Schematic-Context) => {
        const importPath = `./adapter/out/blockchainVendors/${lowerVendorName}/${lowerVendorName}.controller`;
        addImportToModule(tree, paymentsModulePath, `${pascalVendorName}Controller`, importPath);
        return tree;
      },
      (tree: Tree, _context: SchematicContext) => {
        addProviderToModule(tree, paymentsModulePath, `${pascalVendorName}Controller`);
        return tree;
      },
    ]);

    return rule(tree, _context);
  };
}
