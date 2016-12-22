$(document).ready(function()
{
    $('#generateButton').click(function () {
        var numberOfRows = $('#numberOfRows').val();
        var numberOfCols = $('#numberOfCols').val();
        var numberOfStages = $('#numberOfStages').val();
        var numberOfSteps = $('#numberOfSteps').val();
        var numberOfSeeds = $('#numberOfSeeds').val();
        matrix.initialize(numberOfCols,numberOfRows, 1, numberOfStages, numberOfSteps, numberOfSeeds);
    });

    $('#saveButton').click(function () {
        var canvas = document.getElementById("applicationCanvas");
        this.href = canvas.toDataURL('image/png');
    });
});

function unlockUi()
{
    $('#generateButton').prop('disabled', false);
    $('#saveButton').prop('disabled', false);
    $('#loadingText').hide();
}