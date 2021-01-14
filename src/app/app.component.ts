import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;
  title = 'app';
  data = [];
  search = '';

  ngAfterViewInit() {
    // const mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  filter(itemList: JSON[]): JSON[] {
    let result: JSON[] = [];
    let component = this;

    function containSearch(item) {
      let search = component.search.toLowerCase();
      return (search == '' || item.name.toLowerCase().includes(search)
      || item.address.toLowerCase().includes(search))
    }

    return itemList.filter(containSearch);
  }

  constructor () {

    function readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        var allText = null;
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
                if(rawFile.status === 200 || rawFile.status == 0)
                  allText = rawFile.responseText;
        }
        rawFile.send(null);
        return (allText);
    }


    let csv = '../assets/exercice_lekaba.csv';
    let file = readTextFile(csv);
    let fileLines = file.split(/\r|\n|\r/);
    let data = [];

    fileLines.forEach(function(fileLine, index) {
      if (index != 0) {
        let fileData = fileLine.split(',');
        if (fileData[0])
        {
          let fileDataClean = {
            name: fileData[1],
            address: fileData[3] + fileData[4] + fileData[5],
            imgs: fileData[6]
          }
          fileDataClean.address = fileDataClean.address.replace('"', '');
          fileDataClean.address = fileDataClean.address.replace('"', '');
          if (fileDataClean.imgs)
            fileDataClean.imgs = fileDataClean.imgs.split('|');
          data.push(fileDataClean);
        }
      }
    })

    this.data = data;
  }
}
