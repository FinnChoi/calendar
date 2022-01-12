'use strict';
onload = function(){
    const main = document.querySelector('.main-content__container');
    const week = document.querySelector('.week__body');
        
    while(main.childElementCount != 7){
        main.append(week.cloneNode(true));
    }    

    drawDate();
}

function drawDate(date){
    if(!date || date.getDate() != 1){
        const d = new Date();
		date = new Date(d.getFullYear(), d.getMonth(), 1);
    }

    const title = document.querySelector('.header__text  > :first-child');
    title.innerHTML = `${date.getFullYear()}년 ${date.getMonth()+1}월`;

	const year = date.getFullYear();
	const month = date.getMonth();
	let day = (date.getDay() == 0) ? -6 : -(date.getDay() - 1);

	document.querySelectorAll('.week__body > .date').forEach((e)=>{
		const d = new Date(year, month, day);
        
        if(d.getMonth() != month){
            let color = 'lightgrey';

            if (d.getDay() == 0 ) color =  '#ffcdd2';
            else if (d.getDay() == 6)  color = '#bbdefb';

            e.setAttribute('style', 'color: ' + color);
        }

        e.innerHTML = d.getDate();
        e.setAttribute('date', `${new Date( + d + 3240 * 10000).toISOString().split("T")[0]}`);
        day++;
	});
}