'use strict';
class Calendar{
    /**
     * @param {Date} targetDate 
     */
    constructor(targetDate){
       this.targetDate = targetDate;
       this.year = targetDate.getFullYear();
       this.month = targetDate.getMonth();
       this.date = targetDate.getDate();
    }
    /**
     * Draw Calendar in target node
     * @param {string} targetNode string for query selector
     * @returns {string} "yyyy년 mm월"
     */
    draw = function(targetNode, column = 1, row = 1) {
        if(!targetNode || isNaN(row) || isNaN(column)) return;
        row = column > 1 ? 7 : row;

        const ctnr = document.querySelector(`${targetNode}`);
        ctnr.remove
        const week = document.createElement('div');
        week.classList.add('week');
        const date = document.createElement('div');
        date.classList.add('date');

        for(let i = 0; i < row; ++i){
            week.append(date.cloneNode());
        }
        for(let i = 0; i < column + 1; ++i){
            ctnr.append(week.cloneNode(true));
        } 

        let height = ctnr.clientHeight;
        document.querySelectorAll(`${targetNode} > .week`)
        .forEach((cur, idx)=>{
            if(idx == 0) cur.classList.add('week-head');
            else {
                cur.classList.add('week-body');
                if(height != 0) cur.setAttribute('style', `height: ${(96.5 / column).toFixed()}%`);
            }
        });
        
        const days = ['일','월','화','수','목','금','토'];
        let dayIdx = row == 7 ?  0 : this.targtDate.getDay();
        document.querySelectorAll(`${targetNode} > .week-head > .date`)
        .forEach((cur) => {
            cur.innerHTML = days[dayIdx++];
            if(dayIdx > 6) dayIdx = 0;
        });
        
        let startDate = row != 7 ?  this.targetDate : new Date(this.year, this.month,  this.date - this.targetDate.getDay());
        document.querySelectorAll(`${targetNode} > .week-body > .date`)
        .forEach((cur) => {
            cur.innerHTML = startDate.getDate();
            startDate.setDate(startDate.getDate() + 1);
        });

        return `${this.year}년 ${this.month + 1}월`;
    }
}

const today = new Date();
const navCal = new Calendar(new Date(today.getFullYear(), today.getMonth(), 1));
const mainCal = new Calendar(new Date(today.getFullYear(), today.getMonth(), 1));

onload = function(){
    document.querySelector('.calendar__header > .targat-date').innerHTML 
        = navCal.draw('.navigation__calendar > .calendar-container', 6);
    document.querySelector('.header__text').innerHTML 
        = mainCal.draw('.main-content__container', 1, 7);
}