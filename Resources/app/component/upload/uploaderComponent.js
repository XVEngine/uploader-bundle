(function(namespace, app, globals) {


    namespace.uploaderComponent = app.newClass({
        extend: function () {
            return app.core.component.abstractComponent;
        }
    });


    /**
     *
     * @returns {$}
     */
    namespace.uploaderComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                    <xv-uploader>
                        <div class='droparea'>
                            <div>
                                <div class="circle">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </xv-uploader>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };


    /**
     *
     * @returns {object}
     */
    namespace.uploaderComponent.prototype.getDefaultParams = function() {
        return {
            text : "Drag file here or click",
            maxFiles: 5,
            names : [],
            mimes : [],
            extensions : []
        };
    };


    /**
     *
     * @returns {undefined}
     */
    namespace.uploaderComponent.prototype.init = function() {
        this.$droparea = this.$element.find(".droparea");
        this.files = [];
        this.setText(this.params.text);
        this.setMaxFiles(this.params.maxFiles);
        this.setAllowedNames(this.params.names);
        this.setAllowedMimeType(this.params.mimes);
        this.setAllowedExtensions(this.params.extensions);
        this.initEvents();
    };


    /**
     *
     * @returns {undefined}
     */
    namespace.uploaderComponent.prototype.initEvents = function() {
        var self = this;
        this.$element.on("drop", ".droparea", function(e) {
            var $this = $(this);
            var event = e.originalEvent;

            $this.trigger("dragexit");

            if (!event.dataTransfer || !event.dataTransfer.files.length) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            var files = event.dataTransfer.files;
            self.addFiles(files);
            return false;
        });

        this.$element.on("dragexit dragexit dragleave mouseout",  ".droparea" , function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.$element.removeClass("dragover");
            return false;
        });

        this.$element.on("dragenter dragover ",  ".droparea", function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.element.addClass("dragover");
            return false;
        });

        this.$element.on("click",  ".droparea", function(e) {
            self.runFileDialog();
            return false;
        });

    };



    namespace.uploaderComponent.prototype.runFileDialog = function() {
        var self = this;

        var types = [];

        this._allowedExtensions && this._allowedExtensions.forEach(function(ext){
            types.push("."+ext);
        });

        this._allowedMimeType && this._allowedMimeType.forEach(function(mime){
            types.push(mime);
        });

        var $files = $("<input>");
        $files.attr("type", "file");
        $files.attr("multiple", "multiple");
        types.length && $files.attr("accept", types.join(","));
        $files.click();
        $files.change(function() {
            self.addFiles(this.files);
        });
        return true;
    };

    namespace.uploaderComponent.prototype.clear = function(){
        this.files = [];
        return this;
    };

    namespace.uploaderComponent.prototype.getFiles = function(){
        return this.files;
    };

    namespace.uploaderComponent.prototype.addFiles = function(files) {
        if(this._maxFiles && files.length > this._maxFiles){
            this.trigger("onMaxFiles");
            return false;
        }



        var newFiles = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!this.checkMime(file)) {
                this.trigger("onInvalidMimeType");
                return false
            }
            if (!this.checkName(file)) {
                this.trigger("onInvalidName");
                return false;
            }

            if (!this.checkExtension(file)) {
                this.trigger("onInvalidExtension");
                return false;
            }

            newFiles.push(file);
        }

        for(i = 0; i < newFiles.length; i++){
            this.files.push(file);
        }


        (newFiles.length) && this.trigger("onPush");
    };


    namespace.uploaderComponent.prototype.checkMime = function(file) {
        if(!this._allowedMimeType.length){
            return true;
        }

        for(var i = 0; i < this._allowedMimeType.length; i++){
            if(file.mime.wildcardMatch(this._allowedMimeType[i])){
                return true;
            }
        }

        return false;
    };


    namespace.uploaderComponent.prototype.checkName = function(file) {
        if(!this._allowedNames.length ){
            return true;
        }

        for(var i = 0; i < this._allowedNames.length; i++){
            if(file.name.wildcardMatch(this._allowedNames[i])){
                return true;
            }
        }

        return false;
    };


    namespace.uploaderComponent.prototype.checkExtension = function(file) {
        if(!this._allowedExtensions.length){
            return true;
        }

        var extension = file.name.split('.').pop();
        for(var i = 0; i < this._allowedExtensions.length; i++){
            if(extension == this._allowedExtensions[i]){
                return true;
            }
        }

        return false;
    };


    namespace.uploaderComponent.prototype.setAllowedNames = function(names) {
        this._allowedNames = names;
        return this;
    };


    namespace.uploaderComponent.prototype.setAllowedMimeType = function(mimes) {
        this._allowedMimeType = mimes;
        return this;
    };

    namespace.uploaderComponent.prototype.setAllowedExtensions = function(extensions) {
        this._allowedExtensions = extensions;
        return this;
    };


    namespace.uploaderComponent.prototype.setText = function(text) {
        this.$droparea.find(".circle > div").html(text);
        return true;
    };



    namespace.uploaderComponent.prototype.setMaxFiles = function(count) {
        this._maxFiles = count|0;
        return true;
    };



    return namespace.uploaderComponent;
})(__ARGUMENT_LIST__);