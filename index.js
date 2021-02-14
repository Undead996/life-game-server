class App{
    constructor(){
        this.param = process.argv[2];
        this.height;
        this.whidt;
        this.field;
        this.startApp=this.startApp.bind(this);
        this.setSize=this.setSize.bind(this);
        this.setFs=this.setFs.bind(this);
        this.setField=this.setField.bind(this);
        this.arrSum=this.arrSum.bind(this);
        this.lifeStatus=this.lifeStatus.bind(this);
        this.changeLifeStatus=this.changeLifeStatus.bind(this);
        this.createField=this.createField.bind(this);
        this.changeField=this.changeField.bind(this);
    }
    setFs(){
        this.fs=require('fs');
    }
    setSize(a, b){
        this.height = a;
        this.whidt = b;
    }
    setField(){
        this.fs.readFile('data/fieldData.json','utf8', (err, data) => {
            if (err) {
              console.error(err);
              return
            }
            this.field=JSON.parse(data);
            this.height=this.field.length;
            this.whidt=this.field[0].length;
          })

    }
    copyField(){
        let newField = [];
        for (let i=0;i<this.field.length; i++){
            newField[i] = this.field[i].slice();
        }
        return newField;
    }
    arrSum(arr){
        let sum=0;
        arr.forEach(e => {
           sum+=e; 
        });
        return sum;
    }
    lifeStatus(){
        return Math.round(Math.random());
    }
    changeLifeStatus(i,j,tmp,arr){
        if(this.field[i][j]==0&&this.arrSum(arr)==3){
            tmp[i][j]=1;
        }if(this.field[i][j]==1&&this.arrSum(arr)<2||this.field[i][j]==1&&this.arrSum(arr)>3){
            tmp[i][j]=0;
        } 
    }
    // Создание поля
    createField(){
        let tmpField = [];
        for(let i=0;i<this.height;i++){
            tmpField[i] = [];
            for(let j=0;j<this.whidt;j++){
                tmpField[i].push(this.lifeStatus());
            }
        }
        this.field = tmpField;
    }
    // Проверка окружения элементов поля
    changeField(){
        let tmp = this.copyField();
        for(let i=0;i<this.height;i++){
            for(let j=0;j<this.whidt;j++){
                let tmpArr=[];
                if(tmp[i-1]==undefined){
                        tmpArr.push(
                            tmp[i][j-1],                tmp[i][j+1],
                            tmp[i+1][j-1],tmp[i+1][j],tmp[i+1][j+1]
                            )
                        for(let i=0;i<tmpArr.length;i++){
                            if(tmpArr[i]==undefined){
                                tmpArr[i]=0;
                            }
                        }
                }if(tmp[i+1]==undefined){
                        tmpArr.push(
                            tmp[i-1][j-1],tmp[i-1][j],tmp[i-1][j+1],
                            tmp[i][j-1],                tmp[i][j+1],
                            )
                        for(let i=0;i<tmpArr.length;i++){
                            if(tmpArr[i]==undefined){
                                tmpArr[i]=0;
                            }
                        }
                }if(tmp[i+1]!=undefined&&tmp[i-1]!=undefined){
                        tmpArr.push(
                            tmp[i-1][j-1],tmp[i-1][j],tmp[i-1][j+1],
                            tmp[i][j-1],                tmp[i][j+1],
                            tmp[i+1][j-1],tmp[i+1][j],tmp[i+1][j+1]
                            )
                        for(let i=0;i<tmpArr.length;i++){
                            if(tmpArr[i]==undefined){
                                tmpArr[i]=0;
                            }
                        }
                }
                this.changeLifeStatus(i,j,tmp,tmpArr);             
            }
        }
        this.field = tmp;
        this.showLog();
    }
    // Вывод лога
    showLog(){
        let tmp=[];
        for(let i=0;i<this.height;i++){
            tmp.push(this.field[i].join(" "));
        }
        let outPutField = tmp.join("\n");
        console.log(outPutField + "\n");
    }
    startApp(){
        if(!this.param){
            this.setSize(20, 40);
            this.createField();
        }if(this.param=="fieldData.json"){
            this.setFs();
            this.setField();
        }else{
            console.log("Error:wrong data");
        }
        this.showLog();
        setInterval(this.changeField, 1000);
    }
}
let lifeGame = new App;
lifeGame.startApp();




