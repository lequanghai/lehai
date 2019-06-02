module.exports = class BaseRepository {
    constructor(model) {
        this.model = model
    }

    getAll(options = {}) {
        const newOptions = 
            {
                limit: 10,
                page: 1,
                where: {},
                sort: {
                    createAt: -1
                },
                lean: false,
                ...options
            }
        newOptions.skip = (newOptions.page - 1) * newOptions.limit;
        if (newOptions.limit > 10) {
            newOptions.limit = 10
        }
        if(newOptions.populate) {
            return this
            .model
            .find(newOptions.where)
            .limit(newOptions.limit)
            .sort(newOptions.sort)
            .skip(newOptions.skip)
            .populate(newOptions.populate)
            .select(newOptions.select)
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

    getOne(options = {}) {
        const newOptions = {
            limit: 10,
            page: 1,
            where: {},
            sort: {
                _id: -1
            },
            lean: false,
            ...options
        }
        newOptions.skip = (newOptions.page - 1) * newOptions.limit;
        if (newOptions.limit > 10) {
            newOptions.limit = 10
        }
        if(newOptions.populate) {
            return this
            .model
            .findOne(newOptions.where)
            .limit(newOptions.limit)
            .sort(newOptions.sort)
            .skip(newOptions.skip)
            .populate(newOptions.populate)
            .select(newOptions.select)
        }
        return this
            .model
            .findOne(newOptions.where)
            .limit(newOptions.limit)
            .sort(newOptions.sort)
            .skip(newOptions.skip)
            .select(newOptions.select)
    }
    findOneAndUpdate(options = {}) {
        return this
          .model
          .findOneAndUpdate(options.where, options.data)
          .lean(options.lean);
      }
    
      updateOne(option = {}) {
        return this 
          .model
          .updateOne(option.where, option.data)
      }
      
      create(data = {}) {
        return new  this.model(data);
      }
}