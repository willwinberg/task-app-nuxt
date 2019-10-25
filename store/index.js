export const state = () => ({})

export const actions = {
    async fetch({ dispatch }) {
        console.log('Testing')
        const res = await dispatch('user/fetchUser')
        return res
    }
}
