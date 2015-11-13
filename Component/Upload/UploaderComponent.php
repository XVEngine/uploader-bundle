<?php

namespace XVEngine\Bundle\UploaderBundle\Component\Upload;

use XVEngine\Core\Component\AbstractComponent;

/**
 * Class UploaderComponent
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\UploaderBundle\Component\Upload
 */
class UploaderComponent extends AbstractComponent {

    /**
     * @author Krzysztof Bednarczyk
     */
    protected function initialize() {
        $this->setComponentName('upload.uploaderComponent');
        $this->setText("<b>Drag &amp; drop </b><br />  or <br />  <b class='color-main-color-2'>click</b>");
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string|null $url
     * @return $this
     */
    public function setText($text ){
        return $this->setParam("text", $text);
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param int $maxFiles
     * @return $this
     */
    public function setMaxFiles($maxFiles = 0){
        return $this->setParam("maxFiles", $maxFiles);
    }

    /**
     * @author Krzysztof Bednarczyk
     * @param string[] $names
     * @return $this
     */
    public function setAllowedNames(array $names = null){
        return $this->setParam("names", $names);
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string[] $mimes
     * @return $this
     */
    public function setAllowedMimeType(array $mimes = null){
        return $this->setParam("mimes", $mimes);
    }

    /**
     * @author Krzysztof Bednarczyk
     * @param string[] $extensions
     * @return $this
     */
    public function setAllowedExtensions(array $extensions = null){
        return $this->setParam("extensions", $extensions);
    }
}
