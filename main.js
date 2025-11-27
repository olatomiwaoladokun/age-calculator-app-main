// Get all needed parameters
const dateForm = document.querySelector(".date-required");
const functionBtn = document.querySelector("#function-btn");
const dayEntry = document.querySelector("#day-entry");
const monthEntry = document.querySelector("#month-entry");
const yearEntry = document.querySelector("#year-entry");
const yearOutput = document.querySelector("#year-output");
const monthOutput = document.querySelector("#month-output");
const dayOutput = document.querySelector("#day-output");
const errordiv = document.querySelectorAll(".error");
const entryLabel = document.querySelectorAll(".entry-label");






const todayGlobal= new Date();


function logValues (e) {
    e.preventDefault();
    console.log("Success");
    console.log(dayEntry.value);
    console.log(monthEntry.value);
    console.log(yearEntry.value);
};

function leapYearCheck(year){
    const isLeapYear = Number.isInteger(year / 4);
    if (isLeapYear == true){
        console.log("Leap Year");
        return true;
    }else{
        console.log("Not a Leap Year");
        return false;
    }
}

class Person{
    constructor(day=dayEntry, month=monthEntry, year=yearEntry){
        this.day = day.value;
        this.month = month.value;
        this.year = year.value;
        this.today = new Date();
        this.dayBorn = new Date(this.year, this.month, this.day);
        this.daysOld = this.today.getDate() - this.day;
        this.monthsOld = (this.today.getMonth() + 1) - this.month;
        this.yearsOld = this.today.getFullYear() - this.year;
    }

    personDob(){
        return this.dayBorn ;
    };
    // Day
    getDaysOld(){
         return this.daysOld
        // if (dayBorn < 0){
        // }

    };
    // Month
    getMonthsOld(){
        return this.monthsOld;
    }
    // Year
    getYearsOld(){
        return this.yearsOld;
    }
    InvalidError(){

    }
    // Testing of all possible errorrs and catching them
    testFunction (){

        if (this.daysOld < 0 && (this.dayBorn < this.today) ){
            this.monthsOld --;
            console.log(this.monthsOld);
            if (this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11){
                this.daysOld = this.daysOld + 30;
                console.log(this.daysOld);
            }else{
                this.daysOld = this.daysOld + 31;
            }
        }if(this.monthsOld < 0 ){
            this.yearsOld--;
            this.monthsOld = 12 - this.monthsOld;

        }
        if(this.monthsOld > 12){
            this.yearsOld = this.yearsOld + ~~(this.monthsOld/12);
            const difference = this.monthsOld % 12;
            this.monthsOld = this.monthsOld - 12;
 
        }
        else if(this.month == 2){ //February checking
            console.log(this.year);
            const isLeapYear = Number.isInteger(this.year / 4);
            if (isLeapYear == true){
            this.daysOld = this.daysOld + 29;
            }else if(isLeapYear == false){
            this.daysOld = this.daysOld + 28;
            }
            if(isLeapYear == true && this.daysOld> 29){ //Checking for days that are more than usual
                this.monthsOld ++;
                this.daysOld = this.daysOld - 29;
            }else if(isLeapYear == false && this.daysOld> 28){
                this.monthsOld ++;
                this.daysOld = this.daysOld - 28;
            }const testDateLater = new Date( 2026, 23, 38);
                console.log(testDateLater);
        }else if((this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11) && this.daysOld> 30){      
                this.monthsOld ++;
                this.daysOld = this.daysOld - 30;  
        }else if((this.month != 4 && this.month != 6 && this.month != 9 && this.month != 11) && this.daysOld > 31){
                this.monthsOld ++;
                this.daysOld = this.daysOld - 31;
        }
        if(this.dayBorn > this.today){ //Catching the error of those that give a future date as their birthday
        //     if((this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11) && this.day> 30){
        //         errordiv[0].textContent = "Must be a valid date";
        //         entryLabel[0].style.color = "hsl(0, 100%, 67%)";
        //         setTimeout(() => {//Clear error message after three seconds
        //             errordiv[0].textContent = "";
        //             entryLabel[0].style.color = "hsl(0, 1%, 44%)";
        //         }, 3000);

        // };
        errordiv.forEach((error) => error.textContent = "Must be in the past");
        entryLabel.forEach((label) => label.style.color = "hsl(0, 100%, 67%)");
        setTimeout(() => {
            errordiv.forEach((error) => error.textContent = "");
            entryLabel.forEach((label) => label.style.color = "hsl(0, 1%, 44%)");
        }, 3000);
        return "Invalid birthday";
        }
    }
}

console.log
const giveDateBack = (e) =>{
    const isLeapYearBool =  leapYearCheck(yearEntry.value);
    e.preventDefault();
    if ( monthEntry.value < 0 || monthEntry.value > 12 ){
        errordiv[1].textContent = "Must be a valid month";
        return
    }if( monthEntry.value == 2  && isLeapYearBool === true && dayEntry.value > 29){//Checking for invalid leap year february dates
        errordiv[0].textContent = "Must be a valid date";
        entryLabel[0].style.color = "hsl(0, 100%, 67%)";
        setTimeout(() => {//Clear error message after three seconds
            errordiv[0].textContent = "";
            entryLabel[0].style.color = "hsl(0, 1%, 44%)";
            
        }, 3000);
        return;
    }
    if( monthEntry.value == 2  && isLeapYearBool === false && dayEntry.value > 28){//Checking for invalid non-leap year february dates
        errordiv[0].textContent = "Must be a valid date";
        setTimeout(() => {//Clear error message after three seconds
            errordiv[0].textContent = "";
            entryLabel[0].style.color = "hsl(0, 1%, 44%)";
            
        }, 3000);
        return
    }if((monthEntry.value == 4 || monthEntry.value == 6 || monthEntry.value == 9 || monthEntry.value == 11) && dayEntry.value> 30  ){//Checking for abnormally large day numbers for months with 30 days
        entryLabel[0].style.color = "hsl(0, 100%, 67%)";
        errordiv[0].textContent = "Must be a valid date";
        setTimeout(() => {
            errordiv[0].textContent = "";
            entryLabel[0].style.color = "hsl(0, 1%, 44%)";
            
        }, 3000);
    }
    if((monthEntry.value != 4 || monthEntry.value != 6 || monthEntry.value != 9 || monthEntry.value != 11) && this.daysOld > 31 ){//Checking for abnormally large day numbers for months with 31 days
        entryLabel[0].style.color = "hsl(0, 100%, 67%)";
        errordiv[0].textContent = "Must be a valid date";
        setTimeout(() => {
            errordiv[2].textContent = "";
            entryLabel[2].style.color = "hsl(0, 1%, 44%)";
            
        }, 3000);
        return;
    }if (yearEntry.value > todayGlobal.getFullYear()){
        entryLabel[2].style.color = "hsl(0, 100%, 67%)";
        errordiv[2].textContent = "Must be in the past"; 
        setTimeout(() => {
            errordiv[2].textContent = "";
            entryLabel[2].style.color = "hsl(0, 1%, 44%)";
            
        }, 3000);
        return;
    }
    else{
    person1 = new Person();
    person1.testFunction();
    if(dayEntry.value == '' || yearEntry.value == '' || monthEntry.value == ''){
        errordiv.forEach((error) => error.textContent = "This field is required");
        entryLabel.forEach((label) => label.style.color = "hsl(0, 100%, 67%)");
        setTimeout(() => {
            errordiv.forEach((error) => error.textContent = "");
            entryLabel.forEach((label) => label.style.color = "hsl(0, 1%, 44%)");
        }, 3000);
    }else if (person1.testFunction () == "Invalid birthday"){
        console.log("Invalid Birthday")
    }else{    
        const daysOld = person1.getDaysOld();
        const yearsOld = person1.getYearsOld();
        const monthsOld = person1.getMonthsOld();
        console.log(typeof daysOld);
        yearOutput.textContent = yearsOld; 
        dayOutput.textContent = daysOld; 
        monthOutput.textContent = monthsOld;
    }
}
}




dateForm.addEventListener('submit', giveDateBack);