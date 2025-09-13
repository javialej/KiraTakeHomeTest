import {CreateTransferDto} from '../../adapter/in/http/dto/create-transfer.dto';
import {
  VendorRequest,
  VendorResponse,
} from '../../../domain/src/interface/vendors.interface';

class PostCreateTransferMapper {
  public static toModel(request: CreateTransferDto): VendorRequest {
    // In a real implementation, this would map to a domain model
    return request as VendorRequest;
  }

  public static toDTO(domainModel: VendorResponse): CreateTransferDto {
    // In a real implementation, this would map from a domain model
    return domainModel as unknown as CreateTransferDto;
  }
}

export {PostCreateTransferMapper};
