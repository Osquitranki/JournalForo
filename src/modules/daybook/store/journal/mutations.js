export const setEntries = (state,entries) => {
    state.entries = [...state.entries,...entries]
    state.isLoading = false  
}

export const updateEntries = (state,entry) => { //entry actualizada
    const idx = state.entries.map( e => e.id).indexOf(entry.id)
    state.entries[idx]= entry
}
export const addEntries = (state,entry) => {
    state.entries = [entry,...state.entries]
}

export const deleteEntries = (state,id) => {
    state.entries = state.entries.filter(entry => entry.id !== id)
}

