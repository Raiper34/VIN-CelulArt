/**
 * File to manipulate with ui 
 * @Author Filip Gulan
 */

$(document).ready(function ()
{
    $("#panel").draggable({
        handle: "#panel-head",
        scroll: false
    });

    $('#generateButton').click(function () {
        var numberOfRows = $('#numberOfRows').val();
        var numberOfCols = $('#numberOfCols').val();
        var numberOfStages = $('#numberOfStages').val();
        var numberOfSteps = $('#numberOfSteps').val();
        var numberOfSeeds = $('#numberOfSeeds').val();
        var neighbourhoodType = $('#neighbourhoodType input:radio:checked').val()
        matrix.initialize(numberOfCols, numberOfRows, neighbourhoodType, numberOfStages, numberOfSteps, numberOfSeeds);
    });

    $('#saveButton').click(function () {
        var canvas = document.getElementById("applicationCanvas");
        this.href = canvas.toDataURL('image/png');
    });
});

/**
 * Unlock ui, user can generate etc...
 */
function unlockUi()
{
    $('#generateButton').prop('disabled', false);
    $('#saveButton').prop('disabled', false);
    $('#loadingText').hide();
}