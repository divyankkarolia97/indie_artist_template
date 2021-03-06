window.onload=function(){
    $('#music').click(showVenue);
    $('#standup').click(showVenue);
    $('#drama').click(showVenue);
    $('#dance').click(showVenue);

    function showVenue(event){
        console.log(event.target.getAttribute('id'));
        $.post('/artist/locationData',{ category: event.target.getAttribute('id')}).done(function(data){
            console.log(data.location);
            var totalPeople = 0;
            for(index in data.location){
                totalPeople+=data.location[index];
            }
            console.log(totalPeople);
            //      code to represent the data;
            var categoryData = $(`
            
            <table class="table">
  <thead>
    <tr>
      <th>LOCATION</th>
      <th>% RESPONSE</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DELHI</td>
      <td>${Math.round(data.location.Delhi/totalPeople*100)}</td>
    </tr>
    <tr>
      <td>MUMBAI</td>
      <td>${Math.round(data.location.Mumbai/totalPeople*100)}</td>
    </tr>
    <tr>
      <td>CHENNAI</td>
      <td>${Math.round(data.location.Chennai/totalPeople*100)}</td>
    </tr>
    <tr>
      <td>KOLKATA</td>
      <td>${Math.round(data.location.Kolkata/totalPeople*100)}</td>
    </tr>
    <tr>
      <td>GURUGRAM</td>
      <td>${Math.round(data.location.Gurugram/totalPeople*100)}</td>
    </tr>
    <tr>
      <td>NOIDA</td>
      <td>${Math.round(data.location.Noida/totalPeople*100)}</td>
    </tr>
  </tbody>
</table>
            

`)
        $('#categoryData').text("");
        $('#categoryData').append(categoryData);

        })
    }

}