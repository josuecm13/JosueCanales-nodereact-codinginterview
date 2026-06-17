import people_data from '../data/people_data.json';

export class PeopleProcessing {
    getById(id: number) {
        return people_data.find((p) => p.id === id);
    }

    getAll() {
        return people_data;
    }

    getByPage(page: number, limit: number) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        return people_data.slice(startIndex, endIndex);
    }
}
