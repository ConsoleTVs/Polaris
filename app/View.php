<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    /**
     * Attributes hidden from json.
     *
     * @var [type]
     */
    protected $hidden = ['id', 'link_id', 'updated_at'];

    /**
     * The mass assigned attributes.
     *
     * @var array
     */
    protected $fillable = [
        'ip', 'os', 'lang', 'browser',
    ];

    /**
     * Return the view link.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return Link
     */
    public function link()
    {
        return $this->belongsTo(Link::class);
    }
}
