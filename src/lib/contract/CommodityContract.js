var Comment = function (obj) {
    if (typeof obj === "string") {
        obj = JSON.parse(obj)
    }
    if (typeof obj === "object") {
        this.author = obj.author;
        this.createtime = obj.createtime;
        this.comment = obj.comment;
    } else {
        this.author = "";
        this.createtime = "";
        this.comment = "";
    }
}

Comment.prototype = {
    toString: function () {
        return JSON.stringify(this);
    },
    update: function (comment) {
        if (typeof comment === "string") {
            this.comment = this.comment
        }
    }
}

var Commodity = function (obj) {
    if (typeof obj === "string") {
        obj = JSON.parse(obj)
    }
    if (typeof obj === "object") {
        this.key = obj.key;
        this.title = obj.title;
        this.author = obj.author;
        this.createtime = obj.createtime;
        this.comment = obj.comment;
        this.img = obj.img;
    } else {
        this.key = obj.key;
        this.title = "";
        this.author = "";
        this.createtime = 0;
        this.comment = "";
        this.img = ""; //TODO:需要默认图片
    }
};

Commodity.prototype = {
    toString: function () {
        return JSON.stringify(this);
    },
    update: function (comment) {
        if (typeof comment === "string") {
            this.comment = comment;
        }
    }
};


var CommodityContract = function () {
    LocalContractStorage.defineProperties(this, {
        _name: null,
        _creator: null,
        _commodityIndex: 0,
    });


    LocalContractStorage.defineMapProperties(this, {
        "Commodity": {
            parse: function (value) {
                return new Commodity(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "CommodityKeys": {
            parse: function (value) {
                return value.toString();
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "Comment": {
            parse: function (value) {
                return new Comment(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "CommentKeys": {
            parse: function (value) {
                return value.toString();
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "CommentCount": {
            parse: function (value) {
                return value.toString();
            },
            stringify: function (o) {
                return o.toString();
            }
        }
    });
};




CommodityContract.prototype = {
    init: function () {
        this._name = "Nebulas Contract.";
        this._creator = Blockchain.transaction.from;
        this._commodityIndex = 0;
        this._commentIndex = 0;
    },

    name: function () {
        return this._name;
    },

    addCommodity: function (title, comment, img) {
        var from = Blockchain.transaction.from;
        var time = Blockchain.transaction.timestamp.toString(10);
        var commodityKey = from + time;

        var commodity = new Commodity({
            title,
            comment,
            img,
            key: commodityKey,
            author: from,
            createtime: time,
        });

        this.Commodity.set(commodityKey, commodity);
        this.CommodityKeys.set(this._commodityIndex, commodityKey);
        this._commodityIndex++;        
    },

    getCommodity: function (commodityKey) {
        var from = Blockchain.transaction.from;
        var commodity = this.Commodity.get(commodityKey);
        if (!commodity)
            throw new Error("The contract does not exist!");
        return commodity;
    },
    addComment: function (commodityKey, text) {
        var from = Blockchain.transaction.from;
        var time = Blockchain.transaction.timestamp.toString(10);
        var commentIndex = this.CommentCount.get(commodityKey);
        // TODO:有點問題
        if(commentIndex){
            commentIndex = 0;
        }
        var commentKey = "comment" + from + time + commentIndex++;
        var comment = new Comment({
            author: from,
            createtime: time,
            comment: text
        })
        
        this.Comment.set(commentKey, comment)
        
        this.CommentKeys.set(commentIndex,commentKey);
        this.CommentCount.set(commodityKey, commentIndex)
    },

    getAllComment: function (commodityKey) {
        var commentArray = [];
        var commentCount = this.CommentCount.get(commodityKey);
        for(let i = 0; i<=commentCount;i++){
            let commentKey = this.CommentKeys.get(i);
            let comment = this.Comment.get(commentKey);
            commentArray.push(comment);
        }
        return commentArray;
    },

    getAllCommodity: function () {
        var commodityArray = [];
        for (let i = 0; i <= this._commodityIndex; i++) {
            let commodityKey = this.CommodityKeys.get(i);
            let commodity = this.Commodity.get(commodityKey);
            commodityArray.push(commodity);
        }
        return commodityArray;
    }
}


var TestContract = function () {
    LocalContractStorage.defineMapProperties(this, {
        "CommentCount": {
            parse: function (value) {
                return value.toString();
            },
            stringify: function (o) {
                return o.toString();
            }
        }
    })
}
TestContract.prototype = {
    init: function () {

    },
    setCommentCount: function (key, value) {
        this.CommentCount.set(key, value)
    },
    getCommentCount: function (key) {
        return this.CommentCount.get(key)
    }
}

module.exports = CommodityContract;
