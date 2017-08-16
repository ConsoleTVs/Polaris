<?php

namespace App;

use ConsoleTVs\Support\Helpers;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Hash teh user password.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    /**
     * Return the user links.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return Collection
     */
    public function links()
    {
        return $this->hasMany(Link::class);
    }

    /**
     * Returns the user avatar.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @param  integer $dimensions
     * @param  string  $color
     *
     * @return string
     */
    public function avatar($dimensions = 100, $color = 'indigo')
    {
        $name = preg_replace(
            '~&([a-z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml|caron);~i',
            '$1',
            htmlentities($this->name, ENT_COMPAT, 'UTF-8')
        );

        return Helpers::materialAvatar($name, $dimensions, $color);
    }
}
