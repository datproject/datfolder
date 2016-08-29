var noop = function () {}
var defaultState = {
  isPanelOpen: false,
  isLoading: false,
  archiveKey: null,
  fileName: null,
  readStream: null,
  error: null
}

module.exports = {
  namespace: 'preview',
  state: defaultState,
  reducers: {
    update: (data, state) => {
      console.log('update', data, state)
      return {
        archiveKey: data.archiveKey || state.archiveKey,
        fileName: data.fileName || state.fileName,
        readStream: data.readStream || state.readStream
      }
    },
    openPanel: (data, state) => {
      return {isPanelOpen: true}
    },
    closePanel: (data, state) => {
      return defaultState
    }
  },
  effects: {
    file: (data, state, send, done) => {
      send('preview:update', data, noop)
      console.log('opening panel')
      send('preview:openPanel', {}, function () {
        console.log('reading file')
        send('archive:readFile', data, function (readStream) {
          console.log('update')
          send('preview:update', {readStream: readStream}, noop)
        })
      })
      // TODO: state.preview.isPanelOpen + corresponding loading indicator in ui
    }
  }
}
