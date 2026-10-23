class cantGetUrlError extends Error{

    constructor(){
        super("Can't get url error");
        this.name="cantGetUrlError";
    }
}





export{
    cantGetUrlError
}