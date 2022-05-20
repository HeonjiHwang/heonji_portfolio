class Single{
    private static instance : Single;

    public name:string = '';

    private constructor(name:string){
        this.name = name;
    }

    public static getInctance() {
        if(!Single.instance)
            Single.instance = new Single('singleton');

        return Single.instance;
    }
}

let single = Single.getInctance();
console.log(single)