const get_pk = () => {
    const pk = localStorage.getItem('pk');
        if (!pk) {
            console.log('pk не найден');
            return;
        }
    return pk
};

export default get_pk;