const renderCurrentDate = () => {
    const dateTime  = $("#currentDay")
    const displayNow = moment().format("dddd, MMMM Do, YYYY")
    dateTime.text(displayNow)
}

// function to add textarea data to local storage
const renderTextArea = () => {
        //get from local storage
    const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"))
        // check if data is not null (false, do nothing)
if(plannerEvents !== null) {
        // DECLARE A VARIABLE TO GET CURRENT HOUR -> 19
        // const currentHour = moment().hour()

        const currentHour =  moment().hour()
        // get time block elements array -> [9am_block, 10am_block,.....]
        const timeBlocksArray = $(".container .row") 
        // iterate over array
        const callback = function () {
        //get time value from the row
        const textArea =  $(this).find("textarea")
        const timeBlockTime = parseInt($(this).data("time"), 10) 
        // check value time in time block against current hour
    if (timeBlockTime === currentHour) {
            // get child from container "this"
            textArea.removeClass("past").addClass("present")
        }
    if (timeBlockTime > currentHour) {
            textArea.removeClass("present").addClass("future")
        }

        const plannedEvent = plannerEvents[timeBlockTime]
        textArea.text(plannedEvent)
    }
        timeBlocksArray.each(callback)
    } else {
        // add empty array in the local storage
        localStorage.setItem("plannerEvents", JSON.stringify({}));
    }
}

const onClick = function (event) {
    const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"))
    const target = $(event.target)
    if (target.is("button")) {
        const key = target.attr("id")
        const value = target.parent().find("textarea").val()

        const newObject = {
            ...plannerEvents,
            [key]: value
        }
    // add empty array to local storage
        localStorage.setItem("plannerEvents", JSON.stringify(newObject))
    }
}

const onReady = () => {
    //set event listener on container
    $(".container").click(onClick) 
    renderCurrentDate()
    renderTextArea()
}
//add function to display when window is loading
$(document).ready(onReady)

