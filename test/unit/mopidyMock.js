var Mopidy = function(settings){
    this.tracklist = jasmine.createSpyObj(
        'tracklist',
        ['setConsume', 'remove', 'add']
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
    spyOn(this.tracklist, 'getTracks').andCallThrough();
    this.mockSearchResults = ['some results']
    this.library = {
        search: function(query, uris){
            return {
                then: function(fn){
                    fn(that.mockSearchResults);
                }
            }
        }
    };
    spyOn(this.library, 'search').andCallThrough();



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
