import {CreateTransferDto} from '../../../src/adapter/in/http/dto/create-transfer.dto';

class PostCreateTransferUseCase {
  constructor() {} // private readonly domainDataBaseRepository: IDomainDataBaseRepository

  public async apply(command: CreateTransferDto): Promise<any> {
    // In a real implementation, this would save to the database
    // and interact with other domain services.
    return command;
  }
}

export {PostCreateTransferUseCase};
