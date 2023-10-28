import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {

    getAllCats(){
        return [
            {
                id: 1,
                name: 'Cato'
            },
            {
                id: 2,
                name: 'Gatu'
            }
        ]
    }

}
