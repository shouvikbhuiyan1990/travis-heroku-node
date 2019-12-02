const utility = {
    add: ( array, item ) => {
        if( array ) {
            array.push(item);
        }
        return array;
    },
    findById: ( array, id ) => {
        if( array ) {
            return array.filter((data) => data.userId == id);
        }
    },
    updateById: ( array, id, newdata ) => {
        if( array ) {
            return array.map((data) => data.userId == id ? newdata : data );
        }
    },
    deleteById: ( array, id ) => {
        let userdataIndex;
        if( array ) {
            array.map((data, index) => data.userId == id ? userdataIndex = index : '');
            console.log(userdataIndex);
            if (userdataIndex !== undefined) {
                array.splice(userdataIndex, 1);
            }
        }
        return array;
    }
};

exports.utility = utility;