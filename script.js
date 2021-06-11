window.addEventListener('DOMContentLoaded', () => {

    let arr = [];
    const goal = 25;
    const form = document.querySelector("form"),
        entriesWrapper = document.querySelector('#entries'),
        total = document.querySelector('#total'),
        progressTotal = document.querySelector('#progressTotal'),
        average = document.querySelector('#average'),
        highEl = document.querySelector('#high'),
        target = document.querySelector('#target'),
        progressCircle = document.querySelector('#progressCircle');

    target.innerText = goal;

    function reducer(prev, item) {
        return prev + item;
    }

    function calcTotal() {
        const totalValue = arr.reduce(reducer).toFixed(1);
        total.innerText = totalValue;
        progressTotal.innerText = totalValue;
    }

    function calcAverage() {
        average.innerText = (arr.reduce(reducer) / arr.length).toFixed(1);
    }

    function calcGoal() {
        const totalValue = arr.reduce(reducer).toFixed(1);
        let completePercent = totalValue / (goal / 100);
        if (completePercent > 100) completePercent = 100;

        progressCircle.style.background = `conic-gradient(#23ff0d ${completePercent}%, #2d3740 ${completePercent}% 100%)`;
    }

    function weeklyHigh() {
        let high;
        high = Math.max(...arr);
        highEl.innerText = high;
        console.log(high);
    }

    function addNewEntry(newEntry) {
        entriesWrapper.removeChild(entriesWrapper.firstElementChild);
        const listItem = document.createElement('li');
        const listValue = document.createTextNode(newEntry.toFixed(1));
        listItem.appendChild(listValue);

        entriesWrapper.appendChild(listItem)
    }

    function handleSubmit(e) {
        e.preventDefault();
        const inputNum = Number(document.querySelector('#entry').value);
        if (!inputNum) return;

        arr.push(inputNum);

        form.reset();
        addNewEntry(inputNum);
        calcTotal();
        calcAverage();
        weeklyHigh();
        calcGoal();
    }

    form.addEventListener('submit', handleSubmit);


});
