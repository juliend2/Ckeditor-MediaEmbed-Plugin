/*
* @example An iframe-based dialog with custom button handling logics.
*/
( function() {
    CKEDITOR.plugins.add( 'MediaEmbed',
    {
        requires: [ 'iframedialog' ],
        init: function( editor )
        {
           var me = this;
           CKEDITOR.dialog.add( 'MediaEmbedDialog', function (editor)
           {
              return {
                 title : 'Paste Embed Codes',
                 minWidth : 550,
                 minHeight : 200,
                 contents :
                       [
                          {
                             id : 'iframe',
                             label : 'Embed Media',
                             expand : true,
                             elements :
                                   [
                                      {
                           type : 'html',
                           id : 'pageMediaEmbed',
                           label : 'Embed Media',
                           style : 'width : 100%;',
                           html : '<iframe src="'+me.path+'dialogs/mediaembed.html" frameborder="0" name="iframeMediaEmbed" id="iframeMediaEmbed" allowtransparency="1" style="width:100%;margin:0;padding:0;"></iframe>'
                          }
                                   ]
                          }
                       ],
                 // this gets called when Ok is prssed.
                 // stephen: Hey, I'd append ?wmode=transparent to all links... ie for Ie https://www.youtube.com/embed/kRvL6K8SEgY?wmode=transparent Otherwise the youtube/vimeo will kill overlays - not a problem for me yet, but anyone who wants to submit changes I'd edit it.
                 onOk : function()
                 {
                  for (var i=0; i<window.frames.length; i++) {
                     if(window.frames[i].name == 'iframeMediaEmbed') {
                        var content = window.frames[i].document.getElementById("embed").value;
                     }
                  }
                  final_html = 'MediaEmbedInsertData|---' + escape('<span class="media_embed">'+content+'</span>') + '---|MediaEmbedInsertData';
                    editor.insertHtml(final_html);
                    updated_editor_data = editor.getData();
                    clean_editor_data = updated_editor_data.replace(final_html,'<span class="media_embed">'+content+'</span>');
                    editor.setData(clean_editor_data);
                 }
              };
           } );

          editor.addCommand( 'MediaEmbed', new CKEDITOR.dialogCommand( 'MediaEmbedDialog' ) );

          editor.ui.addButton( 'MediaEmbed',
          {
              label: 'Embed Media',
              command: 'MediaEmbed',
              icon: this.path + 'images/icon.gif'
          } );
        }
    } );
} )();
