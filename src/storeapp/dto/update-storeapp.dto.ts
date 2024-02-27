import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreappDto } from './create-storeapp.dto';

export class UpdateStoreappDto extends PartialType(CreateStoreappDto) {}
