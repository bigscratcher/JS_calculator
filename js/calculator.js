/**
    Public-Subcribe model for stacking numbers from buttons pushed
*/
var PubSub = (function(){
    var pubsub = {},
        stackNumber = []
    
    pubsub.resetNumber = function(){
        stackNumber = []
    }
    //stack current number
    pubsub.stackNumber = function(number){
        if(stackNumber.length < 10)   stackNumber.push(number) 
    }
    //return the number
    pubsub.returnNumber = function(){        
        var presentStack = stackNumber
        return parseInt(presentStack.join(''))
    }    
    return pubsub
})()

/**
    Calculator MVC/Module oriented functions for basic calculations
*/
//Calculator View
var CalcView = (function(){
    var view = {}
    view.presentResult = function(result){
       document.getElementById('display-text').innerText = result
    }
    return view
})()

//Calculator Model
var CalcModel = (function(){
    var model = {},
        lastOperator = false,
        calcSum = 0
    
    //Private function for calculating the operations agains the numbers
    function calculateStack(oper, number){
        switch(lastOperator){
            case "+":
                calcSum = calcSum + number
                break
            case "-":
                calcSum = calcSum - number
                break
            case "x":
                calcSum = calcSum * number
                break
            default:
                calcSum = number
        }        
    }
    model.setSum = function(newSum){
        calcSum = newSum
    }
    model.resetSum = function(){
        calcSum = 0
        lastOperator = false
    }
    model.getSum = function(operator, number){     
        if(!!operator && !!number)  calculateStack(operator, number)  
        if(!!operator && operator != '=')  lastOperator = operator      
        return calcSum
    }
    return model
})()

//Calculator Controller
var CalcController = (function(PubSub, CalcView, CalcModel){
    var controll = {}
    // Check if pressed button is operator or number and do the *magic*
    function checkPressed(elem){   
        var numReg = new RegExp('(\\s|^)number(\\s|$)'),
            operatorReg = new RegExp('(\\s|^)operator(\\s|$)')
            
            if(!!elem.className.match(numReg)){
                return 'number'
            }else if(!elem.className.match(operatorReg)){
                return 'operator'
            }
    }

    function calculate(elem, type){
        pressValue = elem.getAttribute('id').split('-').length < 3 ? elem.getAttribute('id').split('-')[1] : '-'              
            
        if(type == 'number'){ 
            //Stack and present the number          
            PubSub.stackNumber(pressValue)                    
            CalcView.presentResult(PubSub.returnNumber())
        }else{
            switch(pressValue){
                case 'c':
                    CalcModel.resetSum()                    
                    CalcView.presentResult(CalcModel.getSum())
                    break                    
                case '=':
                    CalcView.presentResult(CalcModel.getSum(pressValue, PubSub.returnNumber()))                    
                    break
                default:
                    //Calculate result
                    CalcModel.getSum(pressValue, PubSub.returnNumber())                    
            } 
            PubSub.resetNumber()                                
        }
    }
    //Present initial values
    controll.getInitial = function(){       
        CalcView.presentResult(CalcModel.getSum())
    }
    //Get values for any pressed button
    controll.getPressed = function(elem){
        var type = checkPressed(elem) 
        calculate(elem, type)      
    }    
    return controll
})(PubSub, CalcView, CalcModel)
