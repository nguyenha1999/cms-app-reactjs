export class TestController {
    static async create(request, response) {
        
        response.json({
            items: [
                {id: 1,name: "nguyen van a"},
                {id: 2,name: "nguyen van b"},
                {id: 3,name: "nguyen van c"},
                {id: 4,name: "nguyen van d"},
            ],
            total: 4
        });
    }
}