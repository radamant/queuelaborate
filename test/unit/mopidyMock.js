var Mopidy = function(settings){
    var eventStubs = {}
    this.on = function(name, fn){
        if(eventStubs[name])
            eventStubs[name] = fn
    }
    this.tracklist = {
        setConsume: jasmine.createSpy("setConsume()")
    }

    this.stubEvent = function(name){
        eventStubs[name] = function(){};
    }

    this.triggerEvent = function(name){
        eventStubs[name]();
    }

}
