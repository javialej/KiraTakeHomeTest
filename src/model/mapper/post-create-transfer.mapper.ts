import {CreateTransferDto} from '../../adapter/in/http/dto/create-transfer.dto';

class PostCreateTransferMapper {
  public static toModel(request: CreateTransferDto): any {
    // In a real implementation, this would map to a domain model
    return request;
  }

  public static toDTO(domainModel: any): CreateTransferDto {
    // In a real implementation, this would map from a domain model
    return domainModel;
  }
}

export {PostCreateTransferMapper};
