export class CreateBsserviceDto {
	id: number;
	serviceName: string;
	serviceDescription: string;
	price: number;
	avgDuration: Date;
	isActive: boolean;
	updatedAt: Date;
}
