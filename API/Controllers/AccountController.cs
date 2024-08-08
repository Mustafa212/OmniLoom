using API.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers;
[ApiController]

[Route("api/[controller]")]
public class AccountController : Controller
{
    private readonly AppDbContext _Context;

    public AccountController(AppDbContext userDbContext)
    {
        _Context = userDbContext;
    }

    public IActionResult Index()
    {
        return View(_Context.UserAccounts.ToList());
    }

    public IActionResult Registration()
    {
        return View();
    }

    // [HttpPost("register")]
    // public IActionResult Registration(RegisterViewModel model)
    // {
    //     if (ModelState.IsValid)
    //     {
    //         UserAccount account = new UserAccount();
    //         account.FristName = model.FristName;
    //         account.LastName = model.LastName;
    //         account.Email = model.Email;
    //         account.UserName = model.UserName;
    //         account.Password = model.Password;

    //         try
    //         {
    //             _Context.userAccounts.Add(account);
    //             _Context.SaveChanges();

    //             ModelState.Clear();
    //             ViewBag.Message = $"{account.FristName} {account.LastName} registered successfully. Plaese Login. ";
    //         }
    //         catch (DbUpdateException ex)
    //         {
    //             ModelState.AddModelError("", "Please Enter Unique Email or Password");
    //             return View(model);
    //         }

    //         return View();
    //     }
    //     return Ok(model);
    // }
[HttpPost("register")]
public IActionResult Registration([FromBody] RegisterViewModel model)
{
    try
    {
        if (ModelState.IsValid)
        {
            UserAccount account = new UserAccount
            {
                FristName = model.FristName,
                LastName = model.LastName,
                Email = model.Email,
                UserName = model.UserName,
                Password = model.Password
            };

            _Context.UserAccounts.Add(account);
            _Context.SaveChanges();

            ModelState.Clear();
            ViewBag.Message = $"{account.FristName} {account.LastName} registered successfully. Please Login.";

            return Ok(new { message = "User registered successfully" });
        }

        return BadRequest(ModelState);
    }
    catch (DbUpdateException ex)
    {
        ModelState.AddModelError("", "Please Enter Unique Email or Password");
        return BadRequest(new { error = "DbUpdateException", message = ex.Message });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { error = "Exception", message = ex.Message });
    }
}

    public IActionResult Login()
    {
        return View();
    }

    [HttpPost("login")]
    public IActionResult Login(LoginViewModel model)
    {
        if (ModelState.IsValid)
        {
            var user = _Context.UserAccounts.Where(x => (x.UserName == model.UserNameOrEmail || x.Email == model.UserNameOrEmail) &&
                                                                       x.Password == model.Password).FirstOrDefault();


            
            if (model.UserNameOrEmail == "mostafa")
            {
                model.IsAdmin = true;
            }
            else
            {
                model.IsAdmin = false;
            }
            if (user != null)
            {
                
                var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim("Name", user.FristName),
                        new Claim(ClaimTypes.Role, "User")
                    };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                return Ok(model);
            }
            else
            {
                ModelState.AddModelError("", "Username/Email or Password is not correct");
            }
        }
        return BadRequest("not all inserted");
    }

    public IActionResult LogOut()
    {
        HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index");
    }

    [Authorize]
    public IActionResult SecurePage()
    {
        ViewBag.Name = HttpContext?.User?.Identity?.Name;
        return View();
    }
}

