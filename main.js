const renderCurrentDate = () => {
    const dateTime  = $("#currentDay")
    const displayNow = moment().format("dddd, MMMM Do, YYYY")
    dateTime.text(displayNow)
}

const renderCalenderEvents = () => {
    //get from local storage
    const plannerEvents = localStorage.getItem("plannerEvents")
    if(plannerEvents !== null) {
        // DECLARE A VARIABLE TO GET CURRENT HOUR -> 19
        // const currentHour = moment().hour()
        const currentHour = 11
        // get time block elements -> [9am_block, 10am_block,.....]
        const timeBlocksArray = $(".container .row") 

        const callback = function () {
        const timeBlockTime = Number.parseInt($(this).data("time"), 10) 
        if (timeBlockTime === currentHour) {
            $(this).find("textarea").removeClass("past").addClass("present")
        }
         if (timeBlockTime > currentHour) {
            $(this).find("textarea").removeClass("past").addClass("future")
        }
    }
        timeBlocksArray.forEach(callback)
    } else {
        localStorage.setItem("plannerEvents", JSON.stringify({}));
    }
  
}

const onReady = () => {
    renderCurrentDate()
    renderCalenderEvents()
}

$(document).ready(onReady)

