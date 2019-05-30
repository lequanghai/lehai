module.exports = class BaseRepository {
    constructor(model) {
        this.model = model
    }

    getAll(options = {}) {
        const newOptions = 
            {
                limit: 10,
                page: 2,
                where: {},
                sort: {
                    createAt: -1
                },
                select:'username',
                lean: false,
                ...options
            }
        newOptions.skip = (newOptions.page - 1) * newOptions.limit;
        if (newOptions.limit > 10) {
            newOptions.limit = 10
        }
        return this
            .model
            .find(newOptions.where)
            .limit(newOptions.limit)
            .sort(newOptions.sort)
            .select(newOptions.select)
            .lean(newOptions.lean)
            .skip(newOptions.skip);
    }
}