var Mopidy = function(settings){
    this.tracklist = jasmine.createSpyObj(
        'tracklist',
        ['setConsume', 'remove']
    );

    var that = this;
    this.mockTracklist = ['some bogus tracklist'];
    this.tracklist.getTracks = function(){
        return {
            then: function(fn){
                fn(that.mockTracklist)
            }
        }
    }
    spyOn(this.tracklist, 'getTracks').andCallThrough()


    this.playback = jasmine.createSpyObj(
        'playback',
        ['play', 'pause', 'next', 'previous']
    );


    var eventStubs = {}

    this.on = function(name, fn){
        if(eventStubs[name])
            eventStubs[name] = fn
    }

    this.stubEvent = function(name){
        eventStubs[name] = function(){};
    }

    this.triggerEvent = function(name){
        eventStubs[name]();
    }

}
