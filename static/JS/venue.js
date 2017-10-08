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
      <th>#</th>
      <th>LOCATION</th>
      <th>% RESPONSE</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>DELHI</td>
      <td>${Math.round(data.location.Delhi/totalPeople*100)}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>MUMBAI</td>
      <td>${Math.round(data.location.Mumbai/totalPeople*100)}</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>CHENNAI</td>
      <td>${Math.round(data.location.Chennai/totalPeople*100)}</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>KOLKATA</td>
      <td>${Math.round(data.location.Kolkata/totalPeople*100)}</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>GURUGRAM</td>
      <td>${Math.round(data.location.Gurugram/totalPeople*100)}</td>
    </tr>
    <tr>
      <th scope="row">6</th>
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