var Contract = function (obj) {
    if (typeof obj === "string") {
        obj = JSON.parse(obj)
    }
    if (typeof obj === "object") {
        this.id = obj.id;
        this.author = obj.author;//wallet addr
        this.createtime = obj.createtime;
        this.text = obj.text;
    } else {
        this.id = "";
        this.author = "";//wallet addr
        this.createtime = 0;
        this.text = "";
    }
};

Contract.prototype = {
    toString: function () {
        return JSON.stringify(this);
    },
    update: function (text) {
        if (typeof text === "string") {
            this.text = text;
        }
    }
};


var ContContract = function () {
    LocalContractStorage.defineProperties(this, {
        _name: null,
        _creator: null,
        _index: 0
    });

    LocalContractStorage.defineMapProperties(this, {
        "Contract": {
            parse: function (value) {
                return new Contract(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "voteHis": {
            parse: function (value) {
                return value.toString();
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "contractKeys": {
            parse: function (value) {
                return value.toString();
            },
            stringify: function (o) {
                return o.toString();
            }
        }
    });
};

ContContract.prototype = {
    init: function () {
        this._name = "Nebulas Contract.";
        this._creator = Blockchain.transaction.from;
        this._index = 0;
    },

    name: function () {
        return this._name;
    },

    addContract: function (text) {
        //Record voting
        var from = Blockchain.transaction.from;
        var times = Blockchain.transaction.timestamp.toString(10);
        var id = from + times;
        var contract = new Contract({
            text, createtime: times
        });

        this.Contract.set(id,contract);
        this._index++;
        this.contractKeys.set(this._index, id)
    },
    getContractInfo:function (id) {
    	//get vote info by id
    	var from = Blockchain.transaction.from;
    	var contract = this.Contract.get(id);
        if(!contract)
            throw new Error("The vote does not exist!");
       return contract;
    }
}

module.exports = ContContract;
