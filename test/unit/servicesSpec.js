'use strict';

/* jasmine specs for services go here */

describe('service', function() {
    beforeEach(module('qlab.services'));


    describe('version', function() {
        it('should return current version', inject(function(version) {
            expect(version).toEqual('0.1');
        }));
    });

    describe('mopidyConfiguration', function(){
        var mock;

        describe('when when server is in the location search', function(){
            beforeEach(function(){
                mock = {
                    search: function(){
                        return { server: "fooserver" };
                    }
                };

                module(function($provide) {
                    $provide.value('$location', mock);
                });
            });

            it('should return the server as ws address', inject(function(mopidyConfiguration){
                var address = mopidyConfiguration.webSocketUrl;
                expect(address).toEqual("ws://fooserver:6680/mopidy/ws");
            }));
        });

        describe('when the server is not specified', function(){
            it('should not return a webSocketUrl value in the config', inject(function(mopidyConfiguration){
                expect(mopidyConfiguration.webSocketUrl).not.toBeDefined();
            }));
        });
    })
});
