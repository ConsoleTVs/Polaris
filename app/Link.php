<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use ConsoleTVs\Support\Helpers;
use Carbon\Carbon;
use Identify;
use Cache;

class Link extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'original', 'slug',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'user_id',
    ];

    /**
     * Returns the creator of the link.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Creates the full url path for the redirection.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return string
     */
    public function url()
    {
        return route('redirect', ['slug' => $this->slug]);
    }

    /**
     * Return the views of the link.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return Collection
     */
    public function views()
    {
        return $this->hasMany(View::class);
    }

    /**
     * Adds a new view to the link.
     *
     * @author Erik Campobadal <soc@erik.cat>
     */
    public function addView()
    {
        $ip = Helpers::clientIP();

        $view_information = Cache::remember("view_information_{$ip}", Carbon::tomorrow(), function () use ($ip) {
            return [
                'ip' => $ip,
                'os' => Identify::os()->getName(),
                'browser' => Identify::browser()->getName(),
                'lang' => Identify::lang()->getLanguage(),
            ];
        });

        return $this->views()->create($view_information);
    }
}
