import { elements } from "./elements";
import { MDL } from "./model";
import { VIEW } from "./view";


///// Controller
const CTRL = (function(MDL, VIEW) {

    class Item {
        constructor(type, value) {
            this.type = type;
            this.value = value;
        }
    }

    const handleEquals = () => {
        const items = MDL.parseExpression();
        let totalValue;
        switch(items.operator) {
            case("+"):
                totalValue = items.numOne + items.numTwo;
                break;
            case("-"):
                totalValue = items.numOne - items.numTwo;
                break;
            case("x"):
                totalValue = items.numOne * items.numTwo; 
                break;
            case("/"):
                totalValue = items.numOne / items.numTwo;
                break;
        }
        const newItem = new Item("number", totalValue);
        MDL.clearExpression();
        MDL.pushItem(newItem);
        VIEW.appendDisplay();
    };

    const handleClear = () => {
        MDL.clearExpression();
        VIEW.clearDisplay();
    };

    const handleNumber = (event) => {
        const value = event.target.getAttribute("number");
        const number = new Item("number", value);
        console.log(number);
        MDL.pushItem(number);
        console.log(JSON.stringify(MDL.getExpression(), null, 2));
        VIEW.appendDisplay();
    };
    
    const handleOperator = (event) => {
        const value = event.target.getAttribute("operator");
        const operator = new Item("operator", value);
        console.log(operator);
        MDL.pushItem(operator);
        console.log(JSON.stringify(MDL.getExpression(), null, 2));
        VIEW.appendDisplay();
    };

    return {
        handleEquals,
        handleClear,
        handleNumber,
        handleOperator,
    };
} (MDL, VIEW) );



///// Execution and Listeners
elements.calcContainer.addEventListener("click", (event) => {
    if(event.target.matches(".equals")) { 
        CTRL.handleEquals();

    } else if(event.target.matches(".clear")) { 
        CTRL.handleClear();

    } else if(event.target.matches(".num")) {
        CTRL.handleNumber(event);

    } else if(event.target.matches(".operator")) {
        CTRL.handleOperator(event);
    }
});