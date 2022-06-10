export class CreateBsserviceDto {
	id: number;
	serviceName: string;
	serviceDescription: string;
	price: number;
	avgDuration: number;
	isActive: boolean;
	updatedAt: Date;
}
