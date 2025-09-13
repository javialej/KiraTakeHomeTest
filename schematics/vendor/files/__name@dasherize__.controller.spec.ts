import { Test, TestingModule } from '@nestjs/testing';
import { <%= pascalName %>Controller } from './<%= name %>.controller';

describe('<%= pascalName %>Controller', () => {
  let controller: <%= pascalName %>Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= pascalName %>Controller],
    }).compile();

    controller = module.get<<%= pascalName %>Controller>(<%= pascalName %>Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
