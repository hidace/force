_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
Notifications = require '../../../collections/notifications.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artist = require '../../../models/artist.coffee'
DateHelpers = require '../../../components/util/date_helpers.coffee'
JumpView = require '../../../components/jump/view.coffee'
SidebarView = require './sidebar.coffee'
RecentlyAddedWorksView = require './recently_added_works.coffee'
ArtistWorksView = require './artist_works.coffee'
emptyTemplate = -> require('../templates/empty.jade') arguments...

module.exports.NotificationsView = class NotificationsView extends Backbone.View

  initialize: ->

    @user = CurrentUser.orNull()
    @notifications = new Notifications null, since: 30, type: 'ArtworkPublished'
    @filterState = new Backbone.Model
      forSale: false
      artist: null

    @sidebarView = new SidebarView
      el: @$('#notifications-filter')
      filterState: @filterState
    @recentlyAddedWorksView = new RecentlyAddedWorksView
      el: @$('#notifications-works')
      notifications: @notifications
      filterState: @filterState
    @artistWorksView = new ArtistWorksView
      el: @$('#notifications-artist-works')
      filterState: @filterState

    @filterState.on 'change', @render

    @setupJumpView()

  render: =>
    if @filterState.get 'loading'
      @$('#notifications-page').attr 'data-state', 'loading'
      @scrollToTop()
    else if @filterState.get 'artist'
      @$('#notifications-page').attr 'data-state', 'artist'
    else
      @$('#notifications-page').attr 'data-state', 'recent-works'

  setupJumpView: ->
    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'
    @$el.append @jump.$el

  scrollToTop: ->
    @jump.scrollToPosition 0

module.exports.init = ->
  new NotificationsView el: $('body')
  scrollFrame '#notifications-feed a'
  require './analytics.coffee'
