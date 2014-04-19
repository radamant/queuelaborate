var Mopidy = function(settings){
    var eventStubs = {}

    this.on = function(name, fn){
        if(eventStubs[name])
            eventStubs[name] = fn
    }

    this.tracklist = jasmine.createSpyObj(
        'tracklist', ['setConsume']
    );

    this.playback = jasmine.createSpyObj(
        'playback',
        ['play', 'pause', 'next', 'previous']
    );

    this.stubEvent = function(name){
        eventStubs[name] = function(){};
    }

    this.triggerEvent = function(name){
        eventStubs[name]();
    }

}
