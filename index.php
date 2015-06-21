<?php
/**
 * User: orion
 * Date: 21-06-15
 *
 * @param $path
 * @return array|null|string
 */
function getAllFiles($path) {
    $files = array();
    try {
        foreach (new DirectoryIterator($path) as $item) {
            if (substr($item, 0, 1) !== '.') {
                $type = $item->isDir() ? 'dir' : 'file';
                $files[] = array(
                    'name' => $item->getFilename(),
                    'type' => $type,
                );
            }
        }
        usort($files, function($a, $b) {
            $ua = strtolower($a['name']);
            $ub = strtolower($b['name']);
            if ($ua === $ub) {
                return 0;
            }
            return $ua > $ub ? 1 : -1;
        });
        return $files;

    } catch (Exception $exc) {
        return 'error in getAllFiles()';
    }
}
if (!isset($_REQUEST['req']) || !(isset($_REQUEST['path']) ||
        $_REQUEST['req'] !== 'allfiles')) {
    $msg = 'Usage: acservice?allfiles&path=somepath';
}
else {
    $entries = getAllFiles($_REQUEST['path']);

    header('Content-Type: application/x-json');
    header('Access-Control-Allow-Origin: *');

    echo json_encode($entries);
    die;
}
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Service providing files</title>
</head>
<body>
<div><?=$msg?></div>
</body>
</html>

