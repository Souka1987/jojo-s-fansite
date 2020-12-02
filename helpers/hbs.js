module.exports = {

    stripTags: function (Input) {
        //Pour l'éditeur de texte; fonction permettant de remplacer tous ces symboles par des ''.
        //return Input.replace(/<(?:.|\n)*?>/gm, '');
    },

    // Limiter les cards avec la fonction "limit" + "array" qui renvoie à un tableau
    limit: function (arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },
    // Incrémentation 
    inc: (value, option) => {
        return parseInt(value) + 1
    },
    // Pour les users
    ifCond: (v1, v2, options) => {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

}