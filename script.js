// function that contains all the JavaScript
$.fn.startFunction = function()
{
    // adding Day.js advancedFormat plugin for the ordinals
    const advancedFormat = window.dayjs_plugin_advancedFormat;
    dayjs.extend(advancedFormat);

    let hourHolder = $("#hourHolder")
    let newHour = document.createElement("div");
    let newHourTime = document.createElement("div");
    let newHourTextArea = document.createElement("textarea");
    let newHourButton = document.createElement("button");
    let newHourI = document.createElement("i");

    const startTime = 8;
    const totalHours = 11;
    let hour12 = startTime;
    let hour24 = startTime;
    let latin = "AM";
    let hourClass = "future";
    // Getting the current hour from Day.js
    let currentHour = parseInt(dayjs().format('HH'));
    // Getting the current day from Day.js
    $("#currentDay").text(dayjs().format("dddd, MMMM Do"));

    // loop to create the hour blocks
    for (let i = 0; i < totalHours; i++)
    {
        hour12 = startTime + i;
        hour24 = startTime + i;

        if (hour24 < currentHour)
        {
            hourClass = "past";
        }
        else if (hour24 === currentHour)
        {
            hourClass = "present";
        }
        else if (hour24 > currentHour)
        {
            hourClass = "future";
        }

        if ((startTime + i) > 11)
        {
            latin = "PM"
        }
        if ((startTime + i) > 12)
        {
            hour12 = (startTime + i) - 12;
        }

        // The below looks like this in HTML
        /*
        <div id="hour-10" className="row time-block present">
            <div className="col-2 col-md-1 hour text-center py-3">10AM</div>
            <textarea className="col-8 col-md-10 description" rows="3"> </textarea>
            <button className="btn saveBtn col-2 col-md-1" aria-label="save">
                <i className="fas fa-save" aria-hidden="true"></i>
            </button>
        </div>
         */

        newHour = document.createElement("div");
        newHour.setAttribute("class", "row time-block " + hourClass);
        newHour.setAttribute("id", "hour-" + hour24);

        newHourTime = document.createElement("div");
        newHourTime.setAttribute("class", "col-2 col-md-1 hour text-center py-3");
        newHourTime.textContent = `${hour12}${latin}`;

        newHourTextArea = document.createElement("textarea");
        newHourTextArea.setAttribute("class", "col-8 col-md-10 description");
        newHourTextArea.setAttribute("rows", "3");

        newHourButton = document.createElement("button");
        newHourButton.setAttribute("class", "btn saveBtn col-2 col-md-1");
        newHourButton.setAttribute("aria-label", "save");
        newHourI = document.createElement("i");
        newHourI.setAttribute("class", "fas fa-save");
        newHourI.setAttribute("aria-hidden", "true");

        newHourButton.appendChild(newHourI);
        newHour.appendChild(newHourTime);
        newHour.appendChild(newHourTextArea);
        newHour.appendChild(newHourButton);
        hourHolder.append(newHour);
    }

    // Function to save entered text to local storage
    $.fn.save = function()
    {
        localStorage.setItem($(this).parent().attr("id"), $(this).parent().children("textarea").val());
    }

    // Loop to add event listener to all the save buttons
    for (let i = 0; i < hourHolder.children().length; i++) {
        hour24 = startTime + i;
        $("#hour-" + hour24).on("click", "button", $.fn.save)
    }

    // Loop to load any saved text from local storage
    for (let i = 0; i < hourHolder.children().length; i++) {
        hour24 = startTime + i;
        $("#hour-" + hour24).children("textarea").text(localStorage.getItem("hour-" + hour24));
    }

    return 0;
}

// Starting point of the JavaScript
$(document).ready($.fn.startFunction());
