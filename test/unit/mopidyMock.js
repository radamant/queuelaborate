var Mopidy = function(settings){
    var eventStubs = {}
    this.on = function(name, fn){
        if(eventStubs[name])
            eventStubs[name] = fn
    }
    this.tracklist = {
        setConsume: jasmine.createSpy("setConsume()")
    }

    this.playback = {
        play: jasmine.createSpy("play()"),
        pause: jasmine.createSpy("pause()"),
        next: jasmine.createSpy("next()"),
        previous: jasmine.createSpy("previous()")
    }

    this.stubEvent = function(name){
        eventStubs[name] = function(){};
    }

    this.triggerEvent = function(name){
        eventStubs[name]();
    }

}
