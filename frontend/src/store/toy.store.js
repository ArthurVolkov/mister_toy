import { toyService } from "../services/toy.service";

export const toyStore = {
    state: {
        toys: [],
        toysCount: 0,
        filterBy: {
            name: '',
            inStock: 'all',
            type: 'all',
            pageIdx: 0,
            pageSize: 5,
            sortBy: 'name'
        },
        // sortBy: 'name',
        isLoading: false,
    },
    getters: {
        toysCount(state) {
            return state.toysCount
        },
        toysToShow(state) {
            console.log('state.toys:', state.toys)
            return state.toys
            // return state.toys.sort((toyA, toyB) => {
            //     // console.log('state.sortby:', state.sortby)
            //     if (state.sortBy === 'name') return toyA.name.localeCompare(toyB.name)
            //     return toyA.price - toyB.price
            // })
        },
        loading(state) {
            return state.isLoading
        }
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys;
        },
        setCount(state, { count }) {
            state.toysCount = count;
        },
        setToys(state, payload) {
            state.toys = payload.toys;
        },
        addToy(state, { toy }) {
            state.toys.unshift(toy);
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex(t => t._id === toy._id)
            state.toys.splice(idx, 1, toy);
        },
        removeToy(state, { toy }) {
            const idx = state.toys.findIndex(t => t._id === toy._id)
            state.toys.splice(idx, 1)
        },
        setFilter(state, { filterBy }) {
            console.log('filterBy:', filterBy)
            state.filterBy = filterBy
        },
        setPage(state, { page }) {
            console.log('page:', page)
            console.log('filterBy:', state.filterBy)
            state.filterBy.pageIdx = page - 1
        },
        setSort(state, { sortBy }) {
            state.filterBy.sortBy = sortBy
        },
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
    },
    actions: {
        async loadToys(context) {
            context.commit({ type: 'setLoading', isLoading: true })
            try {
                const { toys, count } = await toyService.query(context.state.filterBy)
                // console.log('toys', toys)
                context.commit({ type: 'setToys', toys });
                context.commit({ type: 'setCount', count });
                context.commit({ type: 'setLoading', isLoading: false })
            } catch (err) {
                console.log('Store: Cannot load toys', err);
                throw new Error('Cannot load toys');
            }
        },
        async saveToy(context, { toy }) {
            const type = (toy._id) ? 'updateToy' : 'addToy';
            try {
                const savedToy = await toyService.save(toy)
                context.commit({ type, toy: savedToy })
                return savedToy

            } catch (err) {
                console.log('Store: Cannot save toy', err);
                throw new Error('Cannot save toy');
            }
        },
        async removeToy(context, payload) {
            try {
                const removed = await toyService.remove(payload.toy._id)
                context.commit(payload)
                return removed
            } catch (err) {
                console.log('Store: Cannot remove toy', err);
                throw new Error('Cannot remove toy');
            }
        },
        async addReview(context, { review }) {
            console.log('review:', review)
            try {
                const savedReview = await toyService.saveReview(review)
                // context.commit({type: 'addReview', review: savedReview})
            } catch (err) {
                console.log('Store: Cannot save review', err);
                throw new Error('Cannot save review');
            }
        }
    }
}